---
title: Laboratorio de AWS
date: 2026-03-19
description: Este es un ejemplo más complejo de Markdown
---

## Objetivo del laboratorio

En este laboratorio vas a aprender a proteger información con **AWS Key Management Service (AWS KMS)** desde una instancia **Amazon EC2**. Vas a crear una **clave simétrica** de KMS, asegurarte de que el **rol IAM** de la instancia puede usarla, conectarte a la instancia mediante **Session Manager**, crear archivos de texto de ejemplo, cifrar uno de ellos y después descifrarlo para recuperar el contenido original. AWS KMS está pensado para centralizar la gestión de claves y controlar quién puede utilizarlas. Session Manager permite abrir una terminal en la instancia desde el navegador sin depender de SSH tradicional.

## Duración estimada

Entre **40 y 50 minutos**.

## Entorno del laboratorio

El laboratorio utiliza una instancia EC2 llamada **File Server** y una clave KMS que vas a crear durante la práctica. La conexión a la instancia se hace con **Session Manager**, que requiere que la instancia esté gestionada por Systems Manager y que tenga un rol IAM adecuado. Cuando abras la terminal de la instancia, la AWS CLI usará las credenciales temporales del **rol asociado a esa EC2**, no unas credenciales manuales guardadas con `aws configure`. Por eso, los permisos que importan para cifrar y descifrar son los del **rol de la instancia** y los permisos de la **clave KMS**.

No cambies la región del laboratorio. La clave KMS, la instancia EC2 y los comandos de la AWS CLI deben usarse en la misma región para que el flujo funcione correctamente. Además, la operación `Encrypt` de AWS KMS cifra directamente solo **hasta 4.096 bytes** de texto plano, así que en este laboratorio trabajarás con archivos pequeños. En un caso real, para archivos grandes se suele usar otro patrón, como cifrado por envoltura o un SDK de cifrado.

## Pasos completos

### 1. Abrir la consola y comprobar la región

**Qué vas a hacer:** entrar en la consola del laboratorio y confirmar la región en la que vas a trabajar.

**Por qué se hace:** la clave KMS que vas a crear será regional. Si más adelante intentas usarla desde otra región, los comandos fallarán o no encontrarán el recurso correcto.

1. Abre la **Consola de administración de AWS** del laboratorio.
2. Mira la esquina superior derecha y anota la región activa.
3. Mantén esa región durante todo el laboratorio.

![image.png](attachment:d57f558c-494e-4a0e-b024-7a733d5e6dcf:image.png)

### 2. Identificar el rol IAM de la instancia File Server

**Qué vas a hacer:** localizar el rol IAM que usa la instancia sobre la que trabajarás.

**Por qué se hace:** cuando entres por Session Manager y ejecutes comandos `aws`, quien realmente llama a AWS es el **rol de la instancia**. Si ese rol no está autorizado a usar la clave KMS, aparecerá un error de permisos aunque la clave exista y el comando esté bien escrito. AWS KMS usa la **key policy** como mecanismo principal de control de acceso y también puede apoyarse en políticas IAM, pero solo si la key policy lo permite.

1. En la barra de búsqueda de servicios, escribe **EC2** y entra en **Amazon EC2**.
2. En el menú lateral, pulsa **Instances** (*Instancias*).
3. Selecciona la instancia **File Server**.
4. En el panel de detalles, localiza el campo **IAM role** (*Rol IAM*).
5. Anota el nombre exacto de ese rol.

![image.png](attachment:6f4b3021-a33f-4b0f-bb3d-4372858591ab:image.png)

Guárdalo porque lo vas a necesitar dentro de unos minutos, cuando crees la clave y le des permiso de uso.

En mi caso es **c198735a5084645l14194468t1w184318215385-SSMRole-UZSPMzYiLIYf**, pero en la generación del laboratorio puede cambiar.

### 3. Crear la clave de AWS KMS

**Qué vas a hacer:** crear una **customer managed key** (*clave administrada por el cliente*) de tipo simétrico.

**Por qué se hace:** esta será la clave con la que vas a cifrar y descifrar datos. En KMS, una clave simétrica del tipo **Encrypt and decrypt** es la adecuada para este laboratorio y para muchos casos reales en los que una aplicación necesita proteger pequeños datos sensibles.

1. En la barra de búsqueda de servicios, escribe **KMS** y entra en **Key Management Service**.
2. En el menú lateral, pulsa **Customer managed keys** (*Claves administradas por el cliente*).
3. Pulsa **Create key** (*Crear clave*).
4. En **Key type** (*Tipo de clave*), selecciona **Symmetric** (*Simétrica*).
5. En **Key usage** (*Uso de la clave*), deja seleccionada la opción **Encrypt and decrypt** (*Cifrar y descifrar*).
6. Pulsa **Next** (*Siguiente*).

![image.png](attachment:43adc39b-9780-4569-9f25-e6aa44e545b5:image.png)

Aquí estás indicando a AWS que quieres una clave preparada para operaciones de cifrado y descifrado. No estás creando una clave para firma digital ni una clave asimétrica, sino una clave orientada a proteger datos.

1. En **Alias**, escribe:

```
lab-data-key
```

1. En **Description** (*Descripción*), escribe:

```
Clave para cifrar archivos del laboratorio
```

1. Pulsa **Next**.

![image.png](attachment:1f57448b-70a1-47c0-a7f4-7d9250594e14:image.png)

El **alias** es un nombre legible que te ayuda a reconocer la clave. El **ARN** será el identificador técnico completo que usarás más adelante en la terminal.

### 4. Definir quién administra la clave

**Qué vas a hacer:** elegir quién puede administrar la clave en KMS.

**Por qué se hace:** en AWS KMS, administrar una clave y usar una clave no es exactamente lo mismo. Un principal puede tener permiso para modificar la clave y otro distinto puede tener permiso solo para cifrar y descifrar. Eso permite separar responsabilidades.

1. En la pantalla **Key administrators** (*Administradores de la clave*), deja seleccionada la identidad que el laboratorio ya tenga preparada.
2. Pasad a la pagina 2 y seleccionad el rol que habéis visto antes y los 3 de “voc”.

![image.png](attachment:b3410ae2-1e0f-421c-8053-99e8bb98b4dc:image.png)

1. Pulsa **Next**.

### 5. Dar permiso de uso al rol de la instancia

**Qué vas a hacer:** permitir que el **rol IAM de File Server** use la clave para cifrar y descifrar.

**Por qué se hace:** este es el paso que evita el error típico de `AccessDeniedException` al ejecutar `aws kms encrypt` dentro de la instancia. Como la terminal usa el rol de EC2, ese rol debe quedar autorizado como **usuario de la clave**.

1. En la pantalla **Key users** (*Usuarios de la clave*), busca el nombre del **rol IAM de File Server** que anotaste antes.
2. Márcalo para añadirlo como usuario de la clave.
3. Si el laboratorio también muestra otros usuarios ya seleccionados, déjalos tal como están.
4. Pulsa **Next** y llega hasta el final saltando la edición de política de claves.

![image.png](attachment:93cf05ef-61a3-447d-9b11-5edb7b3e4dbe:image.png)

### 6. Finalizar la creación y copiar el ARN de la clave

**Qué vas a hacer:** terminar la creación de la clave y guardar su identificador técnico.

**Por qué se hace:** en los comandos de la AWS CLI vas a referirte a la clave por su **ARN**, que identifica el recurso de forma inequívoca dentro de la cuenta y la región.

1. Revisa el resumen de la clave.
2. Pulsa **Finish** (*Finalizar*).
3. Abre la clave recién creada.
4. Localiza el campo **Key ARN**.
5. Copia ese valor y guárdalo temporalmente.

![image.png](attachment:a9df5c7b-9d0e-4924-8ecf-2b48a182a537:image.png)

Si la clave no aparece de inmediato en la lista, espera unos segundos y recarga la página.

En el caso del ejemplo es “**arn:aws:kms:us-west-2:184318215385:key/5b443379-1733-4a24-ae70-881b2e2351a1**”

### 7. Conectarte a la instancia con Session Manager

**Qué vas a hacer:** abrir una terminal dentro de la instancia File Server.

**Por qué se hace:** Session Manager permite iniciar una sesión interactiva de shell desde la consola de AWS o desde la CLI sin abrir puertos de entrada ni usar claves SSH tradicionales. En un caso real, esto reduce la superficie de exposición y simplifica la administración del acceso.

1. Vuelve a **EC2 > Instances** (*Instancias*).
2. Selecciona **File Server**.

![image.png](https://file.notion.so/f/f/49dd22ff-cedd-4da8-85e4-99c4598b1dec/d57f558c-494e-4a0e-b024-7a733d5e6dcf/image.png?table=block&id=323214bc-a985-80a4-87b9-ef622984e595&spaceId=49dd22ff-cedd-4da8-85e4-99c4598b1dec&expirationTimestamp=1773806400000&signature=U2tpvi2bk0_UlE4rudCoJRxchLIDB8rtB881ocHHiPQ&downloadName=image.png)

1. Pulsa **Connect** (*Conectar*).
2. En **Connection method** (*Método de conexión*), elige **Session Manager**.

1. Pulsa **Connect**.

Se abrirá una terminal en el navegador. Si tarda unos segundos en aparecer, es normal.


### 8. Preparar la terminal de trabajo

**Qué vas a hacer:** dejar la sesión lista para ejecutar comandos con claridad y sin errores innecesarios.

**Por qué se hace:** vas a fijar la región, comprobar con qué identidad está operando la instancia y guardar el ARN de la clave en una variable para no tener que pegarlo continuamente.

Si no te deja hacer Ctrl+C y Ctrl+V hazlo con el ratón en la terminal

Ejecuta este comando con tus datos:

```bash
cd ~
export AWS_DEFAULT_REGION=TU-REGION
```

Sustituye `TU-REGION` por la región real del laboratorio, por ejemplo:

```bash
export AWS_DEFAULT_REGION=us-west-2
```

Ahora comprueba la identidad activa:

```bash
aws sts get-caller-identity
```

Este comando consulta **AWS Security Token Service** y te devuelve la identidad con la que la instancia está llamando a AWS. Lo normal es que veas un ARN del rol de la instancia. Esto confirma que la AWS CLI está usando las credenciales temporales del rol adjunto a EC2, como recomienda AWS para este tipo de escenarios.

Guarda el ARN de la clave que hemos hecho anteriormente hace unos pasos en una variable y repeta las comillas alrededor de la misma:

```bash
KEY_ARN="PEGA_AQUI_EL_ARN_DE_TU_CLAVE"
```

Comprueba que la variable se ha guardado bien:

```bash
echo $KEY_ARN
echo $AWS_DEFAULT_REGION
```

No ejecutes `aws configure` para guardar credenciales manuales en la instancia. En este laboratorio no hace falta, y el enfoque correcto es usar el rol IAM de la EC2.


### 9. Hacer una prueba rápida de permisos antes del ejercicio principal

**Qué vas a hacer:** verificar con una prueba mínima que la clave creada realmente funciona con el rol de la instancia.

**Por qué se hace:** así detectas un posible problema de permisos al principio, cuando todavía es fácil corregirlo, y no después de haber completado todo el laboratorio.

Ejecuta:

```bash
echo 'prueba' > kms-check.txt

aws kms encrypt \
  --key-id "$KEY_ARN" \
  --plaintext fileb://kms-check.txt \
  --encryption-context Purpose=Lab \
  --output text \
  --query CiphertextBlob | base64 --decode > kms-check.txt.encrypted
```

### Qué significa este comando

- `aws kms encrypt` llama a la operación de cifrado de AWS KMS.
- `-key-id "$KEY_ARN"` indica qué clave debe usar.
- `-plaintext fileb://kms-check.txt` toma el contenido del archivo como entrada binaria.
- `-encryption-context Purpose=Lab` añade un contexto de cifrado.
- `-output text` devuelve la respuesta en texto simple.
- `-query CiphertextBlob` extrae solo el dato cifrado.
- `| base64 --decode` transforma la salida codificada en Base64 al binario real.
- `> kms-check.txt.encrypted` guarda el resultado en un archivo.

El **encryption context** (*contexto de cifrado*) es un conjunto opcional de pares clave-valor no secretos que KMS usa como **additional authenticated data**. Sirve para reforzar la autorización y la trazabilidad del descifrado. Si cifras con un contexto, tendrás que usar exactamente el mismo al descifrar.

Si este comando no da error, puedes seguir. Si aparece un `AccessDeniedException`, vuelve a revisar la clave y asegúrate de que el rol de File Server quedó añadido como **usuario de la clave**.

### 10. Crear la carpeta y los archivos de práctica

**Qué vas a hacer:** generar contenido sencillo sobre el que practicar el cifrado.

**Por qué se hace:** necesitas un archivo legible para comprobar claramente qué ocurre antes y después del proceso de cifrado.

Ejecuta:

```bash
mkdir -p ~/kms-lab
cd ~/kms-lab

cat > secret1.txt <<'EOF'
TOP SECRET 1!!!
Cliente: Ejemplo S.A.
Proyecto: Laboratorio KMS
EOF

echo 'TOP SECRET 2!!!' > secret2.txt
echo 'TOP SECRET 3!!!' > secret3.txt
```

Comprueba que se han creado:

```bash
ls -l
```

Muestra el contenido del primero:

```bash
cat secret1.txt
```

Comprueba también la cantidad de caracteres:

```bash
wc -c secret1.txt
```

Este archivo es pequeño a propósito. AWS KMS `Encrypt` cifra directamente hasta **4.096 bytes**, por eso este laboratorio usa ejemplos breves y controlados.



### 11. Cifrar el archivo principal

**Qué vas a hacer:** transformar `secret1.txt` en un archivo cifrado no legible.

**Por qué se hace:** aquí practicas el núcleo del laboratorio. En un caso real, esto equivaldría a proteger un dato sensible para que no pueda leerse sin la clave y los permisos adecuados.

Ejecuta:

```bash
aws kms encrypt \
  --key-id "$KEY_ARN" \
  --plaintext fileb://secret1.txt \
  --encryption-context Purpose=Lab \
  --output text \
  --query CiphertextBlob | base64 --decode > secret1.txt.encrypted
```

> Este comando **cifra el contenido del archivo `secret1.txt` con AWS KMS** y guarda el resultado en un nuevo archivo llamado `secret1.txt.encrypted`. La operación `Encrypt` de AWS KMS está pensada para **datos pequeños**, hasta **4096 bytes** de texto plano, así que encaja bien con un archivo corto como el del laboratorio.
> 

> **`aws kms encrypt`**
> 

> Aquí estás llamando a la operación **Encrypt** del servicio **AWS KMS** desde la AWS CLI. KMS es el servicio que protege y administra claves criptográficas en AWS.
> 

> **`\` al final de cada línea**
> 

> Esa barra invertida indica que el comando **continúa en la línea siguiente**. Se usa solo para que el comando quede más legible. Podrías escribirlo todo seguido en una sola línea y haría lo mismo.
> 

> **`-key-id "$KEY_ARN"`**
> 

> Le dice a AWS KMS **qué clave debe usar** para cifrar. La variable `"$KEY_ARN"` contiene el ARN de la clave que creaste antes. La CLI acepta distintos identificadores de clave, y el ARN es el más claro y preciso.
> 

> **`-plaintext fileb://secret1.txt`**
> 

> Aquí le indicas cuál es el contenido original que quieres cifrar.
> 

> `-plaintext` significa “texto plano”, es decir, el dato **antes de cifrarlo**.
> 

> `fileb://secret1.txt` le dice a la AWS CLI que lea ese archivo **como binario** directamente. En los comandos `encrypt`, AWS indica que el texto plano debe ir en Base64 o leerse con el prefijo `fileb://`, que evita tener que codificarlo tú a mano.
> 

> **`-encryption-context Purpose=Lab`**
> 

> Añade un **contexto de cifrado**.
> 

> No sirve para ocultar información, sino para asociar metadatos autenticados a la operación de cifrado. En este caso estás diciendo: “este cifrado pertenece al laboratorio”. Luego, al descifrar, tendrás que usar **exactamente el mismo contexto** si quieres recuperar el contenido. AWS recomienda usar este contexto como buena práctica.
> 

> **`-output text`**
> 

> Le pide a la AWS CLI que devuelva la respuesta en formato de texto simple, no en JSON. Esto facilita encadenar la salida con el resto del comando.
> 

> **`-query CiphertextBlob`**
> 

> La respuesta de `aws kms encrypt` trae varios campos. Con `--query CiphertextBlob` te quedas **solo con el campo que contiene el dato cifrado**. Ese filtrado usa **JMESPath**, que es el sistema de consultas de la AWS CLI.
> 

> **`|`**
> 

> La tubería pasa la salida del comando de la izquierda al comando de la derecha.
> 

> **`base64 --decode`**
> 

> AWS CLI devuelve ese `CiphertextBlob` en **Base64**. Este paso lo **decodifica** para convertirlo en el contenido binario real del archivo cifrado. La propia documentación de AWS muestra este patrón de extraer `CiphertextBlob` y después decodificarlo.
> 

> **`> secret1.txt.encrypted`**
> 

> Guarda el resultado final en un archivo nuevo llamado `secret1.txt.encrypted`.
> 

> El símbolo `>` redirige la salida del comando a un archivo. Si el archivo no existe, lo crea; si ya existe, lo sobrescribe.
> 

Comprueba que el archivo cifrado existe:

```bash
ls -l secret1.txt*
```

Si quieres ver que ya no es texto legible:

```bash
hexdump -C secret1.txt.encrypted | head
```

> 
> 
> 
> Este comando sirve para **mirar el principio del archivo cifrado** de una forma ordenada y segura. No intenta interpretar el archivo como texto normal, sino que te muestra sus **bytes reales** en formato hexadecimal. En un laboratorio como este se usa para comprobar visualmente que el archivo ya **no contiene texto legible**, sino datos binarios cifrados.
> 
> - **`hexdump`**
> 
> Es un comando que muestra el contenido de un archivo byte a byte. En lugar de enseñarte palabras o frases, te enseña los valores numéricos reales de cada byte.
> 
> - **`C`**
> 
> Esta opción le pide a `hexdump` una salida “canónica”, más fácil de leer.
> 
> Cada línea suele mostrar tres partes:
> 
> - a la izquierda, la **posición** dentro del archivo
> - en el centro, los **bytes en hexadecimal**
> - a la derecha, una representación **ASCII** si alguno de esos bytes corresponde a caracteres imprimibles
> 
> - **`secret1.txt.encrypted`**
> 
> Es el archivo que quieres inspeccionar. En este caso, el archivo cifrado que generaste con AWS KMS.
> 
> - **`|`**
> 
> Es una tubería. Pasa la salida del comando de la izquierda al comando de la derecha.
> 
> - **`head`**
> 
> Muestra solo las primeras líneas de la salida.
> 
> Esto es útil porque un archivo binario puede producir mucha información, y aquí solo quieres echar un vistazo rápido al principio.
> 
> **Qué estás viendo realmente**
> 
> Cuando ejecutas ese comando, verás algo parecido a esto:
> 
> ```
> 00000000  01 02 3f a8 7c 91 44 2b  8b 44 2a 11 9f 00 73 21  |..?.|.D+.D*...s!|
> 00000010  c7 9a 51 2c 44 88 10 ee  9b 1d 77 33 54 aa 09 6f  |..Q,D.....w3T..o|
> ```
> 
> **Cómo interpretar una línea**
> 
> - **`00000000`** → es la posición inicial de esa línea dentro del archivo
> - **`01 02 3f a8 ...`** → son los bytes reales del archivo en hexadecimal
> - **`|..?.|...|`** → es una posible traducción a caracteres imprimibles, pero como el archivo está cifrado, casi todo aparece como puntos o símbolos sin sentido

Lo que estás viendo ahora ya no es el contenido original, sino el resultado cifrado de KMS. El archivo sigue existiendo, pero su contenido ya no es interpretable como texto plano.

### 12. Descifrar el archivo y recuperar el contenido original

**Qué vas a hacer:** usar la misma clave para convertir el archivo cifrado de nuevo en texto legible.

**Por qué se hace:** el valor del cifrado está en que el dato puede protegerse y recuperarse solo cuando quien lo usa está autorizado y aporta el contexto correcto.

Ejecuta:

```bash
aws kms decrypt \
  --ciphertext-blob fileb://secret1.txt.encrypted \
  --key-id "$KEY_ARN" \
  --encryption-context Purpose=Lab \
  --output text \
  --query Plaintext | base64 --decode > secret1.txt.decrypted
```

### 

- `aws kms decrypt` llama a la operación de descifrado.
- `-ciphertext-blob fileb://secret1.txt.encrypted` indica el archivo cifrado de entrada.
- `-key-id "$KEY_ARN"` especifica la clave que vas a usar.
- `-encryption-context Purpose=Lab` repite exactamente el mismo contexto de cifrado.
- `-query Plaintext` extrae el dato ya descifrado de la respuesta.
- `| base64 --decode` lo convierte en el archivo final.
- `> secret1.txt.decrypted` guarda el contenido recuperado.

Muestra el contenido recuperado:

```bash
cat secret1.txt.decrypted
```

Compáralo con el original:

```bash
diff -s secret1.txt secret1.txt.decrypted
```

Si el comando indica que ambos archivos son idénticos, el proceso ha salido bien. AWS KMS exige que el contexto de cifrado coincida al descifrar cuando se usó en la operación de cifrado.


### 13. Repetir la práctica con los otros archivos

**Qué vas a hacer:** aplicar el mismo patrón a más archivos.

**Por qué se hace:** repetir el flujo ayuda a fijar el proceso y a entender que la clave no está ligada a un único archivo, sino a operaciones de cifrado y descifrado sobre datos pequeños.

Cifra `secret2.txt`:

```bash
aws kms encrypt \
  --key-id "$KEY_ARN" \
  --plaintext fileb://secret2.txt \
  --encryption-context Purpose=Lab \
  --output text \
  --query CiphertextBlob | base64 --decode > secret2.txt.encrypted
```

Cifra `secret3.txt`:

```bash
aws kms encrypt \
  --key-id "$KEY_ARN" \
  --plaintext fileb://secret3.txt \
  --encryption-context Purpose=Lab \
  --output text \
  --query CiphertextBlob | base64 --decode > secret3.txt.encrypted
```

Comprueba el resultado:

```bash
ls -l secret*
```

## Comprobaciones finales

Verifica estos puntos antes de terminar:

1. En **KMS > Customer managed keys** existe una clave simétrica llamada o identificable como la que has creado y su estado es **Enabled** (*Habilitada*).
2. El **rol IAM de File Server** fue añadido como **usuario de la clave** durante la creación.
3. Has podido conectarte a la instancia mediante **Session Manager**.
4. El comando `aws sts get-caller-identity` mostró una identidad válida del rol de la instancia.
5. En la carpeta `~/kms-lab` existen al menos estos archivos:
    - `secret1.txt`
    - `secret1.txt.encrypted`
    - `secret1.txt.decrypted`
6. El comando siguiente confirma que el archivo original y el descifrado son idénticos:

```bash
diff -s secret1.txt secret1.txt.decrypted
```

## Resultado esperado

Al terminar, habrás creado una **clave simétrica de AWS KMS**, habrás entendido que una clave no sirve por sí sola si el **rol IAM de la instancia** no tiene permiso para usarla, habrás comprobado la identidad real con la que opera la terminal de EC2 y habrás completado un ciclo real de **cifrado** y **descifrado** con AWS CLI. También habrás practicado el uso de **encryption context** como contexto adicional del cifrado y una forma moderna de acceso a servidores mediante **Session Manager**.

## Fin del laboratorio

Cierra la sesión de **Session Manager** cuando termines y finaliza el laboratorio desde la plataforma docente. Antes de salir, asegúrate de que entiendes la lógica completa: primero identificas el **rol real** con el que trabaja la instancia, después creas una clave KMS y autorizas a ese rol como **usuario de la clave**, y solo entonces ejecutas el cifrado y el descifrado. Ese orden es la diferencia entre un laboratorio que funciona y otro que falla por permisos.

> No os olvidéis de darle a **Submit** antes de terminar el laboratorio.
>