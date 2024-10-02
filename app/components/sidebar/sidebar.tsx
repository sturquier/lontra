import './sidebar.scss';

export default function Sidebar () {
  const filters = ['AAA', 'BBB', 'CCC']

  return (
    <div className='sidebar'>
      <div className='sidebar-title'>FILTER</div>
      <div className='sidebar-filters'>
        {filters.map((filter: string, index: number) => (
          <div key={index} className='sidebar-filters-filter'>{filter}</div>
        ))}
      </div>
    </div>
  )
}