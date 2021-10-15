export interface Product{
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: Rating
    onCart: boolean
}
export interface Rating{
    rate: number
    count: number
}