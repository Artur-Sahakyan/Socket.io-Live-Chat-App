export const getBrieflyName = (name) => {
    if(typeof name === 'string') {
        return name.length > 6 ? name.slice(0, 5) + '..' : name;
    };

    return name;
};