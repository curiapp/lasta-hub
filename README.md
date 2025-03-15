# Curriculum Development Automation

The aim of this application is to capture and automate the curriculum development process. The process starts from a faculty (actually some members) identifying a need for introducing a new curriculum. After a careful analysis of the needs followed by a conclusive market survey, the curriculum development properly begins. First, the faculty must seek authorisation from the Board of Study (BOS) and the Senate. Then, a committee is put in place to deliver on the actual curriculum development. This curriculum development takes place within a well organised process which is subject to automation. At the end of the process, and with the approval of BOS and Senate, the new curriculum is then submitted to the National Qualification Authority (NQA) for approval and registration.

Furthermore, this application supports a similar process for curriculum revision.

## Key Functionality
Below are some of the functionality the application must fulfil:

* Curriculum development workflow implementation
* Resource management for curriculum development
* Communication management during curriculum development
* Tutorial for curriculum development

## Contributors
coming soon...

## Build and Run Images
**Frontend**
```powershell
docker build -f Dockerfile.frontend -t pdqa-frontend .

docker run -d pdqa-frontend
```

**Backend**
```powershell
docker build -f Dockerfile.backend -t pdqa-backend .

docker run -e KAFKA_BROKER_HOST=host.docker.internal:9092 -p 4931:4931 pdqa-backend
```

## License
to be determined...

## Acknowledgment 
coming soon...
