import {createClient} from 'next-sanity';
import ImageUrlBuilder from '@sanity/image-url'
// creating a client
export const client = createClient({
    apiVersion : '2023-05-03',
    dataset : 'production',
    projectId : process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    useCdn : false
})

// converting images to url.
const builder = ImageUrlBuilder(client);
export function urlFor(source : any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    return builder.image(source)
}