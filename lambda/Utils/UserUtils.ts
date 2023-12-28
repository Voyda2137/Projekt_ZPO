
export const generateTmpPwd = async (): Promise<string> => {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const specialChars = '!@#$%^&*()_-+=<>?';

    const password = [
        getRandomChar(lowercaseChars),
        getRandomChar(uppercaseChars),
        getRandomChar(digits),
        getRandomChar(specialChars),
        getRandomChar(lowercaseChars + uppercaseChars + digits + specialChars),
        getRandomChar(lowercaseChars + uppercaseChars + digits + specialChars),
        getRandomChar(lowercaseChars + uppercaseChars + digits + specialChars),
        getRandomChar(lowercaseChars + uppercaseChars + digits + specialChars),
    ].join('');

    return password;
};

function getRandomChar(characters: string): string {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters.charAt(randomIndex);
}
