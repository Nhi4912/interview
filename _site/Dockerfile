FROM ruby:3.1-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy Gemfile and Gemfile.lock
COPY Gemfile Gemfile.lock ./

# Install Ruby gems
RUN bundle install

# Copy the rest of the application
COPY . .

# Expose port for Jekyll serve (optional)
EXPOSE 4000

# Default command: build Jekyll site
CMD ["bundle", "exec", "jekyll", "build", "--strict_front_matter", "--verbose"] 