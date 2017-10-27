export default {
    path: 'social',
    
    indexRoute: { onEnter: (nextState, replace) => replace('/social/analytics') },
  
    childRoutes: [
      {
        path: 'analytics',
        getComponent(nextState, cb){
          System.import('./GoogleLogin/index').then((m)=> {
            cb(null, m.default)
			
          })
        }
      }
    ]
  
  
  };
  