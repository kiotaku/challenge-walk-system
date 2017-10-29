require 'rails_helper'

RSpec.describe UserController, type: :controller do

  describe "GET #new" do
    it "returns http success" do
      get :new
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #import" do
    it "returns http success" do
      get :import
      expect(response).to have_http_status(:success)
    end
  end

end
