Workflow:
-(done) get all absolute props from Figma (layout & typograhpy)
-(done) set base screen size for all these props

* for responsive: we use JS to determine the screen width of the device & return different CSS based on this 
(otherwise we are just sending extra CSS, like 'mobile classes' that don't apply to desktop, etc.)


Bugs / todo:
- set min & max font sizes (small screens have tiny text, which you can't read)
- autocalculate 'letter-spacing' for fonts