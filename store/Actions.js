import Swal from 'sweetalert2';
export const ACTIONS = {
    NOTIFY: 'NOTIFY',
    AUTH: 'AUTH',
    ADD_CART: 'ADD_CART'
}

export const addToCart = (product, cart) => {
    let countt = 0
    const check = cart.every(item => {
        ++countt
        return item._id !== product._id
    })
    if (countt === 99) {
        Swal.fire('99 Quantities Pending for Checkout, Please first Checkout with them')
        return ({ type: 'NOTIFY', payload: {} })
    }
    if (!check) {
        Swal.fire('Already in the Cart')
        return ({ type: 'NOTIFY', payload: {} })
    }
    Swal.fire('Successfully Added')
    return ({ type: 'ADD_CART', payload: [...cart, { ...product, quantity: 1 }] })
}

export const decrease = (data, id) => {
    const newData = [...data]
    newData.forEach(item => {
        if (item._id === id) {
            if (item.quantity === 1) {
                Swal.fire('Quantity Less than 1 Not Allowed')
                return;
            }
            item.quantity -= 1;
        }
    })
    return ({ type: 'ADD_CART', payload: newData })
}

export const increase = (data, id) => {
    const newData = [...data]
    newData.forEach(item => {
        if (item._id === id) {
            if (item.quantity === 9) {
                Swal.fire('Please Checkout with 9 Quantities first')
                return;
            }
            item.quantity += 1;
        }
    })
    return ({ type: 'ADD_CART', payload: newData })
}
export const deleteFromCart = (data, id) => {
    data = data.filter(i => i._id !== id)
    const newData = [...data]
    return ({ type: 'ADD_CART', payload: newData })
}