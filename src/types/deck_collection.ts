
type DeckCollection = {
    id:number
    is_commander:boolean
    is_maindeck:boolean
    deck_id:number
    card_id:number
    card_name?:string
    search_name?:string
    oracle_text?:string
    type_line?:string
    color_identity?:string
    card_img?:string
    cmc?:number
    double_sided_pointer?:string
}

export default DeckCollection