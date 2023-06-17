import React from 'react'
import * as WebBrowser from 'expo-web-browser'

function useWarmUpBrowser() {

    React.useEffect(() => {
        void WebBrowser.warmUpAsync()
        return () => {
            void WebBrowser.coolDownAsync()
        }
    })

}

export default useWarmUpBrowser