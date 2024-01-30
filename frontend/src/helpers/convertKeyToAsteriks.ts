

export const convertKeyToAsteriks = (key: string): string => {
    const keyLength = key.length;
    const keyAsteriks = "*".repeat(keyLength);
    const keyAsteriksPart = key.slice(0, keyLength);
    const keyAsteriksPartWithAsteriks = keyAsteriksPart.replace(keyAsteriksPart, keyAsteriks);
    const keyWithAsteriks = `${keyAsteriksPartWithAsteriks}`;
    return keyWithAsteriks;
}
