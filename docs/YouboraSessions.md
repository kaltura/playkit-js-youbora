# Youbora sessions integration (javascript)

## To integrate youbora sessions follow this documentation:
https://documentation.npaw.com/npaw-integration/docs/application-analytics-custom-events-data-collection
This means: create a plugin instance that can be accessed globally, and call fireEvent() and fireNav() to report what you want.

## Mix session analytics and video analytics
If the player is instantiated after the plugin tracking sessions, the connection between both will be done automatically.
To do that follow the standard guide for kaltura player with youbora.