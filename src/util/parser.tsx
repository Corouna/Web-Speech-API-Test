export const ssmlToTextParser = (ssml: string) => {
    const plainText = ssml
                        .replace(/<[^>]+>/g, '') // Remove HTML like tags
                        .replace(/&[a-z]+;/g, '') // Remove HTML escape characters
                        .replace(/\s+/g, ' ').trim(); // Remove line breaks and join break sentences into one liner
    return plainText;
}