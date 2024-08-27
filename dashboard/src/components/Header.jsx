/* eslint-disable react/prop-types */


const Header = ({ searchQuery, setSearchQuery, onAddWidgetClick }) => {
  return (
    <header className="text-white p-4 flex justify-between bg-sky-150">
      <h1 className="text-xl font-bold text-black ">CNAPP DASHBOARD</h1>
      <input
        type="text"
        placeholder="Search widgets..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="rounded w-1/2 h-6 px-2 py-1 border-1 border-black mt-1 text-black"
      />
      <div className="gap-3">
      <button
        className=" hover:bg-blue-300 text-black font-bold py-2 px-4 rounded "
        onClick={onAddWidgetClick}
      >
        Add Widget +
      </button>

      <button
        className=" hover:bg-blue-300 text-black font-bold py-2 px-4 rounded "
        onClick={onAddWidgetClick}
      >
        Last 2 days 
      </button>
      </div>
    </header>
  )
}

export default Header
