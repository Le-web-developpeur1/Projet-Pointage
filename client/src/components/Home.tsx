const Home = () => {
    return (
        <div className=" bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-4">
            <h1 className="text-xl font-bold text-gray-700">Marquez votre statut</h1>
            <button className="text-blue-500 border border-blue-500 px-4 py-1 rounded hover:bg-blue-100">
              Voir mon historique
            </button>
          </div>
  
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mt-2">
            Dashboard / <span className="text-gray-700 font-medium">Marquez votre statut</span>
          </nav>
  
          {/* Form */}
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Marquez votre présence ou absence
            </h2>
            <div className="flex items-center gap-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="presence"
                  value="present"
                  className="form-radio text-green-500"
                />
                <span className="ml-2 text-gray-700">Présent</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="presence"
                  value="absent"
                  className="form-radio text-red-500"
                />
                <span className="ml-2 text-gray-700">Absent</span>
              </label>
            </div>
  
            <button className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Home;