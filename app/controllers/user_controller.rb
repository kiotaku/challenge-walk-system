class UserController < ApplicationController
  protect_from_forgery prepend: true, with: :exception
  def new
  end

  def add
    set_number = User.create_random_number
    render json: { number: set_number }
  end

  def import
  end

  def create_with_import
    data = params[:users].map do |user_data|
      set_number = User.create_random_number
      user_data.merge(number: set_number)
    end
    render json: { users: data }
  end

  def retire
  end

  def retired
    User.find_by(number: params[:number]).retire
    render json: {}
  end

  def all_delete
  end

  def excute_all_delete
    CheckPointStatus.delete_all
    User.delete_all
    render json: {}
  end
end
