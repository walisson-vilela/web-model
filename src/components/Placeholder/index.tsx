import React from 'react'

import Template1 from './components/Template1'
import Template2 from './components/Template2'
import Template3 from './components/Template3'
import Template4 from './components/Template4'
import Template5 from './components/Template5'
import Template6 from './components/Template6'
import Template7 from './components/Template7'
import Template8 from './components/Template8'
import Template9 from './components/Template9'
import Template10 from './components/Template10'
import type { PlaceholderProps } from './interfaces'

const Placeholder = (props: PlaceholderProps) => {
  switch (props.type) {
    case 'template1': {
      return <Template1 {...props} />
    }

    case 'template2': {
      return <Template2 {...props} />
    }
    case 'template3': {
      return <Template3 {...props} />
    }
    case 'template4': {
      return <Template4 {...props} />
    }

    case 'template5': {
      return <Template5 {...props} />
    }

    case 'template6': {
      return <Template6 {...props} />
    }
    case 'template7': {
      return <Template7 {...props} />
    }

    case 'template8': {
      return <Template8 {...props} />
    }
    case 'template9': {
      return <Template9 {...props} />
    }

    case 'template10': {
      return <Template10 {...props} />
    }
  }
}

export default Placeholder
