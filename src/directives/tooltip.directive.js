export default  {
    bind( el, binding ) {
        const tooltipPosition = binding.arg

        M.Tooltip.init( el, { 
            html: binding.value, 
            position: tooltipPosition
        } )
    },
    unbind(el) {
        const instance = M.Tooltip.getInstance(el);
        if(instance && instance.destroy){
            instance.destroy()
        }
    }
}

