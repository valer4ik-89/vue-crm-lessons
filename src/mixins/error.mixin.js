import messages from '../utils/messages';
export default {
    computed: {
        error() {
            return this.$store.getters.error
        }
    },
    watch: {
        error(fbError) {
            console.log(fbError)
            this.$error(messages[fbError.code] || 'что-то пошло не так')
        }
    }
};
