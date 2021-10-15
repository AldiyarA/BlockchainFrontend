export interface Cart{
    id: number
    userId: number
    products: Order[]
    departureDate: Date
    arrivalDate: Date
    isBooked: boolean
    status: string
}
export interface Order{
    productId: number
    quantity: number
}
let idCounter = 0

export var carts: Cart[] =[]
