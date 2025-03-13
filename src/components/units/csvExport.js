export const csvExport = (data) => {
    if (!Object.values(data).length ) return 1;
    return [Object.keys(data).join(";"), Object.values(data).join(";")].join('\n')
}