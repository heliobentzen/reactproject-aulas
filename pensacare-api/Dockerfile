FROM eclipse-temurin:21-alpine
RUN apk add --update openvpn
RUN sed -i 's/default = default_sect/default = default_sect\nlegacy = legacy_sect/' /etc/ssl/openssl.cnf
RUN sed -i 's/\[default_sect\]/[default_sect]\nactivate = 1\n\n[legacy_sect]\nactivate = 1/' /etc/ssl/openssl.cnf
