import { client } from "@/lib/sanity"

export const getCategories = async () => {
    const query = 
    `
    *[_type == 'category'] {
        categoryName,
        "currentSlug" : slug.current
    }
    `

    return client.fetch(query)
}

export const getProjects = async () => {
    const query = 
    `
    *[_type == 'project'] {
        title, 
        description,
        location,
        budjet,
        'currentSlug' : slug.current,
        area,
        client, 
        _createdAt,
        "thumbnail" : image.asset,
        images,
        "category" : category->slug.current
    } `

    return client.fetch(query)
}
