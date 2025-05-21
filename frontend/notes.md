# Notes
* 5/12: in the middle of saving data to server by adding the note service methods to the app.jsx
* 5/13: trying to figure out why the button is not rendering in the list: https://grok.com/chat/dd3d269a-083c-4a6e-a072-8af971dffb07
  * the plan was to render the button directly within the PersonDisplay component i/o of a separate component to see if the event handler would work correctly
  * I am also still unsure of my previous (deleted) logic around handling the delete axios method
* 5/14: I need to figure out how to re render the persons array such that it updates with the updated information
  * Shouldn't I just be able to set the persons array to the current values of the persons database since the persons array IS the persons database?
* 5/15: exercise 2.16; figuring out how to conditionally render a notification component for a set amount of time (timeout) after each action: adding, modifying, deleting.
  * I have a feeling that I could do this very simply with conditional jsx within the component
  * I am also troubled at how I would only render it once the action occurs; I think I will need to control this via the notificationType state

# Issues
* the way of inputting phone numbers is frustrating. It would be great if it could format it in the (000) 000-0000 style directly.
* 