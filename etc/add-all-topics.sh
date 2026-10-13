#!/bin/bash

# declare the array of topics
topicol=("create-users-res" "create-users-req" "find-users-res" "find-users-req" "summary-res" "summary-req" "need-analysis-start-res" "need-analysis-start-req" "need-analysis-conclude-res" "need-analysis-conclude-req" "need-analysis-consult-res" "need-analysis-consult-req" "need-analysis-survey-res" "need-analysis-survey-req" "need-analysis-bos-start-res" "need-analysis-bos-start-req" "need-analysis-apc-recommend-res" "need-analysis-apc-recommend-req" "need-analysis-bos-recommend-res" "need-analysis-bos-recommend-req" "need-analysis-senate-start-res" "need-analysis-senate-start-req" "need-analysis-senate-recommend-res" "need-analysis-senate-recommend-req" "cur-dev-appoint-pac-res" "cur-dev-appoint-pac-req" "cur-dev-draft-revise-res" "cur-dev-draft-revise-req" "cur-dev-draft-submit-res" "cur-dev-draft-submit-req" "cur-dev-draft-validate-res" "cur-dev-draft-validate-req" "consult-start-pac-res" "consult-start-pac-req" "consult-benchmark-res" "consult-benchmark-req" "cur-dev-appoint-cdc-res" "cur-dev-appoint-cdc-req" "consult-final-draft-res" "consult-final-draft-req" "consult-endorse-res" "consult-endorse-req" "review-unit-start-res" "review-unit-start-req" "review-unit-recommend-res" "review-unit-recommend-req")

# print each topic 
echo "will now print each topic..."
printf "\n"
for i in "${topicol[@]}"
do
	echo "currently working on topic $i"
	/home/kafka//kafcont2/bin/kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic $i
done
