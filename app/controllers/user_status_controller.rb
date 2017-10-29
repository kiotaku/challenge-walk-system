class UserStatusController < ApplicationController
  def index
    render json: User.all.map(&:summary)
  end

  def show
  end
end
