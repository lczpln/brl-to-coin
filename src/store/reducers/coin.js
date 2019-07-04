const INITIAL_STATE = {
    coins: [],
}

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}

export default function coinReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "INITIAL_VALUE":
            return { coins: action.payload.map(coin => { return { id: uuidv4(), ...coin } }) }
        default:
            return { ...state };
    }
}