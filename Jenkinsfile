pipeline {
    agent any

    tools {
        nodejs 'nodejs20'  // Ensure this matches Jenkins tool name
    }

    environment {
        IMAGE_NAME = 'siku9786/todo-app'   // Docker image name
        IMAGE_TAG = 'latest'               // Can change to BUILD_NUMBER if desired
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/sikander-riaz/Todo'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests & Generate Coverage') {
            steps {
                sh 'npm test -- --coverage'  // Adjust this if your test script differs
            }
        }

        stage('SonarQube Scan') {
            steps {
                withSonarQubeEnv('sonarqube') {
                    withEnv(["PATH+SONAR=${tool 'sonarqube'}/bin"]) {
                        sh '''
                            sonar-scanner \
                              -Dsonar.projectKey=todo-app \
                              -Dsonar.projectName=todo-app \
                              -Dsonar.sources=. \
                              -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
                        '''
                    }
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
                '''
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'docker-hub-token', variable: 'DOCKER_TOKEN')]) {
                    sh '''
                        echo "${DOCKER_TOKEN}" | docker login -u siku9786 --password-stdin
                        docker push ${IMAGE_NAME}:${IMAGE_TAG}
                    '''
                }
            }
        }
    }
}
