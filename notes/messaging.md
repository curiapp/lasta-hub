
# Notes on messaging

@Jose - 1 - We should define the format for our own messages. This should take place within a message representation definition. Message representation can be inspired from an agent communication language (ACL). Example of such are FIPA ACL or KQML.

In a nutshell, a message should be represented as a component or an object with the following attributes:
 - sender: the component which sent the message
 - receivers: the component(s) to which the message is destined
 - performative: this is the purpose of the message, which action should be taken once the message is received
 - reply-to: the component(s) that should be sent a message in response to the current one.
 - in-reply-to: a reference of the previous message that was exchanged before
 - content: the payload of the message. In general, the message content can be structure in JSON. However,
            the message content can be structured following a different formalism. In this case, the language
            of the message content should be specified

@Nobert Will try to think of a simpler messaging system
