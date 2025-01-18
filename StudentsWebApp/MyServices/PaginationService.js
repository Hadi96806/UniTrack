app.service('PaginationService', function () {
    this.getPages = function ( itemsPerPage, Items) {
        var totalPages = Math.ceil(Items.length / itemsPerPage);
        var pages = [];

        for (var i = 1; i <= totalPages; i++) {
            pages.push({
                title: i,
                isFirst: i === 1,
                isLast: i === totalPages,
                isPrevious: i-1 >= 1,
                isNext: i + 1 <= totalPages,
            });
        }

        return pages;
    };
    this.updateDisplayedItems = function updateDisplayedItems(Items, currentPage, itemsPerPage, callback) {
        var begin = ((currentPage - 1) * itemsPerPage);
        var end = begin + itemsPerPage;
        var displayedItems = Items.slice(begin, end);
        callback(displayedItems);
    }
    this.setPage = function (page, currentPage, callback) {
       if (page.isFirst || page.isLast || page.isPrevious || page.isNext) {
        currentPage = page.title;
            if (typeof callback === 'function') {
                callback(currentPage);
            }
       }
    };
});
