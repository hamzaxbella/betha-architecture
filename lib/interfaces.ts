type Category = {
    categoryName : {ar : string , fr  : string , en : string},
    currentSlug : string
}

export type Project = {
    title : {ar : string , fr  : string , en : string},
    description : {ar : string , fr  : string , en : string},
    location : {ar : string , fr  : string , en : string},
    budjet : number,
    area : number,
    client : {ar : string , fr  : string , en : string},
    _createdAt : string,
    thumbnail : string,
    images : string[],
    currentSlug : string,
    category : string
}

export interface CategoriesPRops {
    categories: Category[];
}

export interface HomeTemplateProps {
    categories: Category[];
    projects: Project[];
}

export interface ProjectsListProps {
    projects : Project[]
    homeList?: boolean
}
  