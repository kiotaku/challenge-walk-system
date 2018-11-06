class CheckPointController < ApplicationController
  protect_from_forgery prepend: true, with: :exception
  def index
    render json: CheckPoint.try(:sequence)
  end

  def pass
  end

  def change_status_to_pass
    User.find_by(number: params[:number]).pass_check_point(params[:check_point_id])
    render json: {}
  end

  def settings
  end

  def set
    CheckPoint.delete_all
    previous_check_point_id = nil
    params[:check_points].each do |check_point|
      cp = CheckPoint.create!(name: check_point[:name], previous_check_point_id: previous_check_point_id)
      previous_check_point_id = cp.id
    end
    render json: {}
  end
end
