/**
 * sorts a HTMl table
 * @param {HTMLTableElement} table the table to sort
 * @param {number} col the index of column to sort
 * @param {boolean} asc determines if sorting will be ascending or descending
 */

function sortTables(table,col,asc=true){
    const dirModifier =asc ? 1 : -1;
        const tBody= table.tBodies[0];
        const rows= Array.from(tBody.querySelectorAll("tr"));

        //sort each row
        const sortedRows = rows.sort((a,b) =>{
            console.log(a);console.log(b);
        });
}
sortTables(document.querySelector("table"),1);