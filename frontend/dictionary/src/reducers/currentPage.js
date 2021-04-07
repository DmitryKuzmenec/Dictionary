export default function Pager(state = undefined, action) {
    if (action.type !== "CURRENT_PAGE") {
        return state;
    }
    switch (action.page) {
        case "home":
            state = "HOME"; break;
        case "signin":
            state = "SIGNIN"; break;
        case "signup": 
            state = "SIGNUP"; break;
        case "dictionaries":
            state = "DICTIONARIES"; break;
        case "learning":
            state = "LEARNING"; break;
    } 
    return state;
}