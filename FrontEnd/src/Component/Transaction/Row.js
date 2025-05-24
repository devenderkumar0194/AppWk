const Row = (props) => {
    var trn = props.trn;
    return <>
    <tr>
        <td scope="row">{
            new Date(trn.createdAt).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            })
        }</td>
        <td>{trn.credit?"₹"+trn.credit:""}</td>
        <td>{trn.debit?"₹"+trn.debit:""}</td>
        <td>{trn.desc}</td>
        <td>{"₹"+trn.balence}</td>
    </tr>
    </>;
}

export default Row;