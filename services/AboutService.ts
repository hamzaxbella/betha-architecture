import { client } from "@/lib/sanity"

export const getAboutContent = async () => {
    const query = `
    *[_type == 'about'] {
        profile,
        philosophy,
        "mainImage" : image.asset,
        awards,
        about,
    }[0]`

    return client.fetch(query)
}