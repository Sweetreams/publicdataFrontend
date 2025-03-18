export const createURL = (data, type = 'json') => {
    const blob = new Blob([data], {type: type == 'csv' ? 'text/csv;charset=utf-8;' : 'application/json;charset=utf-8'})
    const link = document.createElement("a");
    link.setAttribute("href", URL.createObjectURL(blob));
    link.setAttribute("download", type == 'csv' ? `data${Date.now()}.csv` : `data${Date.now()}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }