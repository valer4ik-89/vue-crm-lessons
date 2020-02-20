export default {
    data() {
        return {
            page: +this.$route.query.page || 1,
            pageSize: 5,
            pageCount: 0,
            allItems: [],
            items: []
        }
    },
    methods: {
        pageChangeHandler(page) {
            this.$router.push(`${this.$route.path}?page=${page}`)
            this.items = this.allItems[page - 1] || this.allItems[0]
        },
        setupPagination(allItems) {
            let array = allItems
            let size = this.pageSize
            let subarray = []; 
            for (let i = 0; i < Math.ceil(array.length/size); i++){
                subarray[i] = array.slice((i*size), (i*size) + size);
            }

            this.allItems = subarray
            this.pageCount = this.allItems.length
            this.items = this.allItems[this.page - 1] || this.allItems[0]
            
        }
    }
}
