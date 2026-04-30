const TaskFilters = ({ filters, setFilters }) => {
  return (
    <section>
      <select
        value={filters.status}
        onChange={(ev) => setFilters({ ...filters, status: ev.target.value })}
      >
        <option value="">Todos los estados</option>
        <option value="pending">Pendientes</option>
        <option value="completed">Completadas</option>
      </select>

      <input
        type="date"
        value={filters.date}
        onChange={(ev) => setFilters({ ...filters, date: ev.target.value })}
      />
      <select
        value={filters.sort}
        onChange={(ev) => setFilters({ ...filters, sort: ev.target.value })}
      >
        <option value="">Sin ordenar</option>
        <option value="date_asc">Fecha ascendente</option>
        <option value="date_desc">Fecha descendente</option>
        <option value="status_asc">Estado ascendente</option>
        <option value="status_desc">Estado descendente</option>
      </select>
    </section>
  );
};

export default TaskFilters;
