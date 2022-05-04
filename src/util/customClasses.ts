export class StringMutation {
    StringMutation() {}

    public getNamesLabel(text: string): string {
        let _splited_text = text?.split(' ')
        return !_splited_text?.length
            ? ''
            : _splited_text[0][0] + _splited_text[1][0]
    }
}
