export function Increment() {
    return {
        type: "INCREMENT"
    }
}

export function Decrement() {
    return {
        type: "DECREMENT"
    }
}

export function Signin() {
    return {
        type: "SIGNIN"
    }
}

export function Signout() {
    return {
        type: "SIGNOUT"
    }
}

export function CurrentPage(page) {
    return {
        type: "CURRENT_PAGE",
        page: page,
    }
}


