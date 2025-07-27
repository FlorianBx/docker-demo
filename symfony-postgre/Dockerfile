FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    zip \
    unzip \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pdo pdo_pgsql pgsql mbstring exif pcntl bcmath gd \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/symfony

RUN groupadd -g 1000 www && useradd -u 1000 -ms /bin/bash -g www www

COPY --chown=www:www symfony/composer.json ./

RUN chown -R www:www /var/www/symfony

USER www

RUN composer install --no-scripts --no-autoloader

COPY --chown=www:www symfony/ .

RUN composer dump-autoload --optimize

USER root
RUN echo '#!/bin/bash\n\
until nc -z postgresql 5432; do\n\
  echo "Waiting for PostgreSQL..."\n\
  sleep 1\n\
done\n\
\n\
su www -c "composer install"\n\
su www -c "bin/console doctrine:database:create --if-not-exists"\n\
su www -c "bin/console doctrine:schema:update --force"\n\
su www -c "bin/console cache:clear"\n\
\n\
php-fpm' > /usr/local/bin/entrypoint.sh && \
    chmod +x /usr/local/bin/entrypoint.sh

RUN apt-get update && apt-get install -y netcat-traditional && rm -rf /var/lib/apt/lists/*

EXPOSE 9000

CMD ["/usr/local/bin/entrypoint.sh"]