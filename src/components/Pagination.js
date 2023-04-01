function Pagination(props) {

    const { articlesCount, articlesPerPage, activePage, updateCurrentPageIndex } = props;

    let numberOfPages = Math.ceil(articlesCount / articlesPerPage);
    let pagesArray = [];
    for (let i = 1; i <= numberOfPages; i++) {
        pagesArray.push(i)
    }


    return (
        <div className="flex space-between">
            <div
                onClick={() => updateCurrentPageIndex(activePage - 1 < 1 ? 1 : activePage - 1)}
                className="pg-btn">Prev</div>
            <div className="pagination">
                {
                    pagesArray.map(page =>
                        <span
                            key={page}
                            onClick={() => updateCurrentPageIndex(page)}
                            className={`${activePage === page ? 'active' : ""}`}
                        >{page}</span>)
                }
            </div>
            <div
                onClick={() => updateCurrentPageIndex(activePage + 1 > numberOfPages ? numberOfPages : activePage + 1)}
                className="pg-btn">next</div>
        </div>
    )
}


export default Pagination;