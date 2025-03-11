export const csvExport = (data) => {
    if (!Object.values(data).length ) return 1;
    const descEng = []
    const headers = Object.keys(data.title).map(key => {
        const items = Object.values(data.title[key])
        console.log(items)
        descEng.push("\"" + items[1] + "\"")
        return ["\"" + items[0] + "\""]
    })
    const dataContent = Object.keys(data[0].data).map(key => {
        const items = data[0].data[key]
        return ["\"" + items.title + "\"", "\"" + items.desc + "\"", "\"" + items.owner_data + "\"", "\"" + items.date_publication + "\"", "\"" + items.date_update + "\"", "\"" + items.format_data + "\"", "\"" + items.key + "\"", "\"" + items.id_data + "\""].join(';')
    })

    return [headers.join(';'), descEng.join(';'), ...dataContent].join('\n')
}