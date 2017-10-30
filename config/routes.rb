Rails.application.routes.draw do
  root to: 'root#root'

  get 'admin', to: 'root#admin'

  get 'user/import'

  post 'user/import', to: 'user#create_with_import'

  get 'user/new'

  post 'user/new', to: 'user#add'

  get 'user/retire'

  post 'user/retire', to: 'user#retired'

  get 'user/all_delete'

  post 'user/all_delete', to: 'user#excute_all_delete'

  get 'check_point/index'

  get 'check_point/pass'

  post 'check_point/pass', to: 'check_point#change_status_to_pass'

  get 'check_point/settings'

  post 'check_point/set'

  get 'user_status', to: 'user_status#show'

  get 'user_status/index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
