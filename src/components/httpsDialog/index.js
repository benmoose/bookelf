import React from 'react'
import { Intent, Button, AnchorButton, Dialog } from '@blueprintjs/core'

const HttpsDialog = ({ open, onClose }) => (
  <Dialog
    isOpen={open}
    icon='info-sign'
    title='Go to secure version?'
    onClose={onClose}
  >
    <div className='pt-dialog-body'>
      <p>
        You're currently on an insecure version of BookELF.
        Would you like to visit the secure version at <code>https://bookelf.surge.sh</code>?
      </p>
    </div>
    <div className='pt-dialog-footer'>
      <div className='pt-dialog-footer-actions'>
        <Button onClick={onClose}>No, keep me here</Button>
        <AnchorButton
          intent={Intent.PRIMARY}
          href='https://bookelf.surge.sh'
        >Yes, take me there</AnchorButton>
      </div>
    </div>
  </Dialog>
)

export default HttpsDialog
