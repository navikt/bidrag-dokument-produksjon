FROM busybox:1.36.1-uclibc as busybox

FROM gcr.io/distroless/java21-debian12:nonroot
LABEL maintainer="Team Bidrag" \
      email="bidrag@nav.no"

COPY --from=busybox /bin/sh /bin/sh
COPY --from=busybox /bin/printenv /bin/printenv

WORKDIR /app

COPY build/libs/app.jar app.jar
COPY templates templates
COPY resources resources
COPY data data

EXPOSE 8080
ENV TZ="Europe/Oslo"
ENV SPRING_PROFILES_ACTIVE=nais
ENV JDK_JAVA_OPTIONS="-Dlogback.configurationFile=logback-remote.xml"
ENV DISABLE_PDF_GET="false"
ENV ENABLE_HTML_ENDPOINT="true"
CMD ["app.jar"]