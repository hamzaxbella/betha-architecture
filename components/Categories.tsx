import { CategoriesPRops } from "@/lib/interfaces"
import { useLangaugeStore } from "@/hooks/LanguageStore"
import { useFilter } from "@/hooks/UseFilter"
import { AllTranslation } from "@/constants"

const Categories = ({categories} : CategoriesPRops) => {

  const {langauge , font } = useLangaugeStore()
  const {selectedFilter , setSelectedFilter} = useFilter()
  
  return (
    <div className="flex justify-center gap-4 overflow-x-auto">
        <div className={``} >
          <button onClick={() => setSelectedFilter('all')} className={`${font} text-md lg:text-lg font-light border rounded-full py-2 lg:py-4 px-10 whitespace-nowrap  hover:bg-slate-100 ${selectedFilter === 'all' && 'bg-black text-white hover:!bg-black'}`}>{AllTranslation[langauge]}</button>
        </div>

      {categories.map((category) => (
        <div className={``} key={category.currentSlug}>
          <button onClick={() => setSelectedFilter(category.currentSlug)} className={` ${font} text-md lg:text-lg font-light border rounded-full py-2 lg:py-4 px-10 whitespace-nowrap hover:bg-slate-100 ${selectedFilter === category.currentSlug && 'bg-black text-white hover:!bg-black'}`}>{category.categoryName[langauge]}</button>
        </div>
      ))}
    </div>
  )
}

export default Categories