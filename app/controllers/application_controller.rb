class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :basic_auth

  def basic_auth
    authenticate_or_request_with_http_basic do |user, password|
      is_post = request.method == 'POST'
      is_admin = request.path_info != '/check_point/pass' &&
                  request.path_info != '/user/retire' &&
                  request.path_info != '/user_status' &&
                  request.path_info != '/user_status/index' &&
                  request.path_info != 'check_point/index'
      is_post || (!is_admin && user == 'challenge' && password == 'walk') || (user == 'challenge_admin' && password == 'root_walk')
    end
  end
end
