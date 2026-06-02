# Distributed key-value store

## Considerations TODO

- What is the actual use case?
- What are the throughput requirements
  - What will be the bottleneck? E.g. disk, RAM, NIC etc
- What is the scale/volume of data?
- What are our latency requirements? (TODO consider whether I want to make this most important)
- What is our consistency model? (for me, probably eventually consistency)
- What are the specific semantics that we are supporting?
  - Just get/set?
  - Delete?
  - Update?
  - Others, e.g. update two values transactionally?
- What about a secondary index?

## Step 1 scope

- Just GET/SET (don't worry about DELETE; and SET will overwrite an existing key)
- For now, the placeholder wire protocol can just be:
  - Keys and values cannot have spaces
  - Messages are operation (GET or SET) <space> key <space> value
- Use UDP over localhost to not worry about connection management
- Aim to support two clients on one machine speaking to the same server, which simply blocks while servicing each client
- Do it all in memory: worry about persistence later

## Step 1 steps/milestones

- Server which echos over UDP
- Server which sets on SET and gets on GET
- Test with two clients